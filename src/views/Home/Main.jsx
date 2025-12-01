import React from "react";
import styled from "styled-components";
import { ReactComponent as GroupIcon } from "../../assets/Home_img/group.svg";
import { ReactComponent as TruckIcon } from "../../assets/Home_img/delivery.svg";
import { ReactComponent as HoursIcon } from "../../assets/Home_img/24Hours.svg";
import { ReactComponent as ShieldIcon } from "../../assets/Home_img/shield.svg";
import { useNavigate } from "react-router-dom";

const LuminaSection = styled.section`
    display: flex;
    flex-direction: column;
    padding: 4rem 6rem;
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    
    @media (max-width: 768px) {
        padding: 2rem;
    }
`;

const MainContent = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 3rem;

    @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
    }
`;

const ContentContainer = styled.div`
    flex: 1;
    z-index: 2;
`;

const Title = styled.h1`
    font-size: 3.5rem;
    font-weight: bold;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1.5rem;
    line-height: 1.2;

    @media (max-width: 768px) {
        font-size: 2.5rem;
    }
`;

const Subtitle = styled.p`
    font-size: 1.8rem;
    color: #555;
    margin-bottom: 2rem;
    line-height: 1.5;

    @media (max-width: 768px) {
        font-size: 1.4rem;
    }
`;

const ShopButton = styled.button`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 1rem 2.5rem;
    border: none;
    border-radius: 30px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
    }
`;

const ImageSection = styled.div`
    flex: 1;
    position: relative;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
        height: 300px;
        width: 100%;
        margin-top: 2rem;
    }
`;

const HeroImage = styled.img`
    width: 100%;
    max-width: 500px;
    height: auto;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    object-fit: cover;
`;

const FeaturesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    margin-top: 2rem;
    z-index: 3;

    @media (max-width: 968px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
    }
`;

const FeatureItem = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    svg {
        width: 40px;
        height: 40px;
        color: #667eea;
    }

    div {
        p {
            font-weight: 600;
            margin: 0;
            font-size: 1.1rem;
            color: #333;
        }

        span {
            color: #666;
            font-size: 0.9rem;
        }
    }
`;

const Main = () => {
    const navigate = useNavigate();

    return (
        <LuminaSection>
            <MainContent>
                <ContentContainer>
                    <Title>
                        LUMINA:
                        <br />
                        ELEVATE YOUR
                        <br />
                        STYLE
                    </Title>
                    <Subtitle>
                        Premium Fashion,
                        <br />
                        Timeless Elegance,
                        <br />
                        Unmatched Quality
                    </Subtitle>
                    <ShopButton onClick={() => navigate('/products')}>Shop Now</ShopButton>
                </ContentContainer>

                <ImageSection>
                    <HeroImage
                        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Fashion Collection"
                    />
                </ImageSection>
            </MainContent>

            <FeaturesContainer>
                <FeatureItem>
                    <GroupIcon />
                    <div>
                        <p>Seasonal Sales</p>
                        <span>New collections weekly</span>
                    </div>
                </FeatureItem>
                <FeatureItem>
                    <TruckIcon />
                    <div>
                        <p>Free Shipping</p>
                        <span>On orders over $50</span>
                    </div>
                </FeatureItem>
                <FeatureItem>
                    <HoursIcon />
                    <div>
                        <p>24/7 Support</p>
                        <span>We're here to help</span>
                    </div>
                </FeatureItem>
                <FeatureItem>
                    <ShieldIcon />
                    <div>
                        <p>Secure Payment</p>
                        <span>100% Protected transactions</span>
                    </div>
                </FeatureItem>
            </FeaturesContainer>
        </LuminaSection>
    );
};

export default Main;
